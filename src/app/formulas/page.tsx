'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { FormulaEditor } from '@/components/formulas/FormulaEditor';
import { FormulaList } from '@/components/formulas/FormulaList';
import { FormulaCalculator } from '@/components/formulas/FormulaCalculator';
import { useFormulaManager } from '@/hooks/useFormulaManager';
import { FORMULA_TEMPLATES } from '@/lib/formulas/templates';
import { validateFormula } from '@/lib/validators/formulaValidator';
import type { CustomFormula } from '@/types/formulas';
import { Plus, X, Check, AlertCircle, Lightbulb, Calculator } from 'lucide-react';

type ViewMode = 'list' | 'editor' | 'calculator';

export default function FormulasPage() {
  const {
    formulas,
    addFormula,
    updateFormula,
    deleteFormula,
    duplicateFormula,
    exportFormulas,
    importFormulas,
    generateShareUrl,
    parseSharedFormula,
  } = useFormulaManager();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingFormula, setEditingFormula] = useState<CustomFormula | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<CustomFormula | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<number | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get('shared');
      if (shared) {
        const parsed = parseSharedFormula(shared);
        if (parsed) {
          setEditingFormula(parsed);
          setViewMode('editor');
        }
      }
    }
  }, [parseSharedFormula]);

  const handleSaveFormula = useCallback(
    (name: string, expression: string) => {
      const validation = validateFormula(expression);

      if (!validation.valid) {
        return;
      }

      const variables = validation.variables.map((v) => ({
        name: v,
        label: v,
        unit: '',
        defaultValue: 1,
        min: 0,
        max: 1000,
      }));

      if (editingFormula?.id) {
        updateFormula(editingFormula.id, {
          name,
          expression,
          variables,
        });
      } else {
        addFormula({
          name,
          expression,
          variables,
          description: '',
          category: 'custom',
        });
      }

      setViewMode('list');
      setEditingFormula(null);
    },
    [editingFormula, addFormula, updateFormula]
  );

  const handleEditFormula = useCallback((formula: CustomFormula) => {
    setEditingFormula(formula);
    setViewMode('editor');
  }, []);

  const handleDeleteFormula = useCallback(
    (id: string) => {
      if (confirm('¿Estás seguro de eliminar esta fórmula?')) {
        deleteFormula(id);
      }
    },
    [deleteFormula]
  );

  const handleSelectFormula = useCallback((formula: CustomFormula) => {
    setSelectedFormula(formula);
    setViewMode('calculator');
  }, []);

  const handleShare = useCallback(
    (id: string) => {
      const url = generateShareUrl(id);
      if (url) {
        navigator.clipboard.writeText(url);
        alert('URL copiada al portapapeles');
      }
    },
    [generateShareUrl]
  );

  const handleExport = useCallback(() => {
    const json = exportFormulas();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hidraulicalc-formulas-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportFormulas]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const result = importFormulas(content);

        if (result.success) {
          setImportSuccess(result.count);
          setImportError(null);
          setTimeout(() => setImportSuccess(null), 3000);
        } else {
          setImportError(result.error || 'Error al importar');
          setTimeout(() => setImportError(null), 5000);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [importFormulas]);

  const handleTemplateSelect = useCallback((template: (typeof FORMULA_TEMPLATES)[0]) => {
    setEditingFormula({
      id: '',
      name: template.name,
      expression: template.expression,
      variables: template.variables,
      description: template.description,
      category: template.category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setShowTemplates(false);
    setViewMode('editor');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-[#00d4ff]" />
            <h1 className="text-3xl font-bold text-[#f5f5f5]">Fórmulas Personalizadas</h1>
          </div>
          <p className="text-[#f5f5f5]/60">
            Crea, guarda y calcula con tus propias fórmulas matemáticas
          </p>
        </div>

        {importError && (
          <div className="mb-4 p-4 rounded-xl bg-[#ff4444]/10 border border-[#ff4444]/30 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#ff4444]" />
            <p className="text-sm text-[#ff4444]">{importError}</p>
          </div>
        )}

        {importSuccess !== null && (
          <div className="mb-4 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center gap-2">
            <Check className="w-5 h-5 text-[#00d4ff]" />
            <p className="text-sm text-[#00d4ff]">
              {importSuccess} fórmula(s) importada(s) correctamente
            </p>
          </div>
        )}

        {viewMode === 'list' && (
          <>
            <div className="flex gap-3 mb-6">
              <Button
                onClick={() => {
                  setEditingFormula(null);
                  setViewMode('editor');
                }}
                variant="primary"
                className="flex-1"
              >
                <Plus className="w-4 h-4" />
                Nueva Fórmula
              </Button>
              <Button onClick={() => setShowTemplates(!showTemplates)} variant="secondary">
                <Lightbulb className="w-4 h-4" />
                Plantillas
              </Button>
            </div>

            {showTemplates && (
              <div className="mb-6 p-4 rounded-xl glass border border-[#00d4ff]/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#00d4ff]">Plantillas Predefinidas</h3>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="text-[#f5f5f5]/50 hover:text-[#f5f5f5]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {FORMULA_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="p-3 rounded-lg bg-[#121212] border border-[#f5f5f5]/10 hover:border-[#00d4ff]/30 text-left transition-all"
                    >
                      <p className="text-sm font-medium text-[#f5f5f5]">{template.name}</p>
                      <p className="text-xs text-[#f5f5f5]/50 font-mono truncate">
                        {template.expression}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <FormulaList
              formulas={formulas}
              onEdit={handleEditFormula}
              onDelete={handleDeleteFormula}
              onDuplicate={duplicateFormula}
              onShare={handleShare}
              onExport={handleExport}
              onImport={handleImport}
              onSelect={handleSelectFormula}
            />
          </>
        )}

        {viewMode === 'editor' && (
          <div>
            <Button
              onClick={() => {
                setViewMode('list');
                setEditingFormula(null);
              }}
              variant="ghost"
              className="mb-4"
            >
              ← Volver a la lista
            </Button>
            <FormulaEditor
              initialName={editingFormula?.name || ''}
              initialExpression={editingFormula?.expression || ''}
              onSave={handleSaveFormula}
              onCancel={() => {
                setViewMode('list');
                setEditingFormula(null);
              }}
            />
          </div>
        )}

        {viewMode === 'calculator' && selectedFormula && (
          <div>
            <Button
              onClick={() => {
                setViewMode('list');
                setSelectedFormula(null);
              }}
              variant="ghost"
              className="mb-4"
            >
              ← Volver a la lista
            </Button>
            <FormulaCalculator
              formula={selectedFormula}
              onBack={() => {
                setViewMode('list');
                setSelectedFormula(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
