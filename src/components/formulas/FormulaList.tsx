'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trash2, Copy, Share2, Edit3, Download, FolderOpen, Calculator } from 'lucide-react';
import type { CustomFormula } from '@/types/formulas';

interface FormulaListProps {
  formulas: CustomFormula[];
  onEdit: (formula: CustomFormula) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShare: (id: string) => void;
  onExport: () => void;
  onImport: () => void;
  onSelect?: (formula: CustomFormula) => void;
}

export function FormulaList({
  formulas,
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
  onExport,
  onImport,
  onSelect,
}: FormulaListProps) {
  const categoryColors: Record<string, string> = {
    volume: 'bg-[#00d4ff]/10 border-[#00d4ff]/30 text-[#00d4ff]',
    flow: 'bg-[#00ff88]/10 border-[#00ff88]/30 text-[#00ff88]',
    pressure: 'bg-[#ff6b35]/10 border-[#ff6b35]/30 text-[#ff6b35]',
    velocity: 'bg-[#ff00ff]/10 border-[#ff00ff]/30 text-[#ff00ff]',
    area: 'bg-[#ffff00]/10 border-[#ffff00]/30 text-[#ffff00]',
    custom: 'bg-[#f5f5f5]/10 border-[#f5f5f5]/30 text-[#f5f5f5]',
  };

  const categoryLabels: Record<string, string> = {
    volume: 'Volumen',
    flow: 'Caudal',
    pressure: 'Presión',
    velocity: 'Velocidad',
    area: 'Área',
    custom: 'Custom',
  };

  if (formulas.length === 0) {
    return (
      <Card variant="glass" className="text-center py-12">
        <CardContent>
          <FolderOpen className="w-16 h-16 mx-auto text-[#f5f5f5]/20 mb-4" />
          <h3 className="text-lg font-semibold text-[#f5f5f5]/80 mb-2">
            No hay fórmulas guardadas
          </h3>
          <p className="text-sm text-[#f5f5f5]/50 mb-6">
            Crea tu primera fórmula personalizada para comenzar
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={onImport} variant="secondary" size="sm">
              <Download className="w-4 h-4" />
              Importar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#f5f5f5]">Mis Fórmulas ({formulas.length})</h2>
        <div className="flex gap-2">
          <Button onClick={onImport} variant="ghost" size="sm">
            <Download className="w-4 h-4" />
            Importar
          </Button>
          <Button onClick={onExport} variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        {formulas.map((formula) => (
          <Card
            key={formula.id}
            variant="glass"
            hover
            className="cursor-pointer group"
            onClick={() => onSelect?.(formula)}
          >
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Calculator className="w-4 h-4 text-[#00d4ff]" />
                    <h3 className="font-semibold text-[#f5f5f5] truncate">{formula.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${
                        categoryColors[formula.category] || categoryColors.custom
                      }`}
                    >
                      {categoryLabels[formula.category] || 'Custom'}
                    </span>
                  </div>

                  <p className="text-sm text-[#f5f5f5]/60 font-mono truncate mb-2">
                    {formula.expression}
                  </p>

                  {formula.variables.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {formula.variables.map((v) => (
                        <span
                          key={v.name}
                          className="px-1.5 py-0.5 rounded text-xs bg-[#121212] text-[#f5f5f5]/60"
                        >
                          {v.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {formula.description && (
                    <p className="text-xs text-[#f5f5f5]/40 mt-2 line-clamp-1">
                      {formula.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(formula);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicate(formula.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(formula.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-2"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(formula.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-2 text-[#ff4444] hover:text-[#ff6666]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
