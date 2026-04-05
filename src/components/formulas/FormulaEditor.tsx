'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { validateFormula, getSyntaxHelp } from '@/lib/validators/formulaValidator';
import { useDebounce } from '@/hooks/useDebounce';
import { CheckCircle2, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import type { FormulaValidationResult } from '@/types/formulas';

interface FormulaEditorProps {
  initialExpression?: string;
  initialName?: string;
  onSave?: (name: string, expression: string) => void;
  onCancel?: () => void;
}

export function FormulaEditor({
  initialExpression = '',
  initialName = '',
  onSave,
  onCancel,
}: FormulaEditorProps) {
  const [name, setName] = useState(initialName);
  const [expression, setExpression] = useState(initialExpression);
  const [validation, setValidation] = useState<FormulaValidationResult>({
    valid: true,
    errors: [],
    variables: [],
  });
  const [showHelp, setShowHelp] = useState(false);

  const debouncedExpression = useDebounce(expression, 300);

  useEffect(() => {
    if (debouncedExpression) {
      const result = validateFormula(debouncedExpression);
      setValidation(result);
    } else {
      setValidation({ valid: true, errors: [], variables: [] });
    }
  }, [debouncedExpression]);

  const handleSave = useCallback(() => {
    if (validation.valid && name.trim() && expression.trim()) {
      onSave?.(name.trim(), expression.trim());
    }
  }, [validation.valid, name, expression, onSave]);

  const syntaxHelp = getSyntaxHelp();

  return (
    <Card variant="glass-strong" className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Editor de Fórmulas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#f5f5f5]/80 mb-2">
              Nombre de la fórmula
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Volumen de cilindro"
              className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-[#f5f5f5]/10 text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#00d4ff]/50 focus:ring-2 focus:ring-[#00d4ff]/20 outline-none transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#f5f5f5]/80">
                Expresión matemática
              </label>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="flex items-center gap-1 text-xs text-[#00d4ff] hover:text-[#00f0ff] transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Ayuda de sintaxis
              </button>
            </div>

            <div className="relative">
              <textarea
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Ej: pi * r^2 * h"
                rows={3}
                className={`w-full px-4 py-3 rounded-xl bg-[#121212] border text-[#f5f5f5] font-mono text-lg placeholder:text-[#f5f5f5]/30 outline-none transition-all resize-none ${
                  validation.valid
                    ? 'border-[#f5f5f5]/10 focus:border-[#00d4ff]/50 focus:ring-2 focus:ring-[#00d4ff]/20'
                    : 'border-[#ff4444] focus:border-[#ff4444] focus:ring-2 focus:ring-[#ff4444]/20'
                }`}
              />

              <div className="absolute right-3 top-3">
                {expression &&
                  (validation.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-[#00d4ff]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#ff4444]" />
                  ))}
              </div>
            </div>

            {validation.errors.length > 0 && (
              <div className="mt-2 space-y-1">
                {validation.errors.map((error, index) => (
                  <p key={index} className="text-sm text-[#ff4444] flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    {error.message}
                  </p>
                ))}
              </div>
            )}

            {validation.variables.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-[#f5f5f5]/60 mb-1">Variables detectadas:</p>
                <div className="flex flex-wrap gap-2">
                  {validation.variables.map((variable) => (
                    <span
                      key={variable}
                      className="px-2 py-1 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-mono"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showHelp && (
            <div className="p-4 rounded-xl bg-[#0f0f0f] border border-[#f5f5f5]/10 space-y-3">
              <h4 className="text-sm font-semibold text-[#00d4ff]">Guía de sintaxis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {syntaxHelp.map((section) => (
                  <div key={section.category} className="space-y-1">
                    <h5 className="text-xs font-medium text-[#f5f5f5]/80">{section.category}</h5>
                    <ul className="space-y-0.5">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="text-xs text-[#f5f5f5]/60 font-mono">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={!validation.valid || !name.trim() || !expression.trim()}
              variant="primary"
              className="flex-1"
            >
              Guardar fórmula
            </Button>
            {onCancel && (
              <Button onClick={onCancel} variant="secondary">
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
