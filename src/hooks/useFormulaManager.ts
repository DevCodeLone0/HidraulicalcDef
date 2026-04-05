'use client';

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { CustomFormula, FormulaVariable } from '@/types/formulas';

const STORAGE_KEY = 'hidraulicalc-formulas';

export function useFormulaManager() {
  const [formulas, setFormulas] = useLocalStorage<CustomFormula[]>(STORAGE_KEY, []);
  const [activeFormula, setActiveFormula] = useState<CustomFormula | null>(null);

  const addFormula = useCallback(
    (formula: Omit<CustomFormula, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newFormula: CustomFormula = {
        ...formula,
        id: `formula-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setFormulas((prev) => [newFormula, ...prev]);
      return newFormula;
    },
    [setFormulas]
  );

  const updateFormula = useCallback(
    (id: string, updates: Partial<Omit<CustomFormula, 'id' | 'createdAt'>>) => {
      setFormulas((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updates, updatedAt: Date.now() } : f))
      );
    },
    [setFormulas]
  );

  const deleteFormula = useCallback(
    (id: string) => {
      setFormulas((prev) => prev.filter((f) => f.id !== id));
      if (activeFormula?.id === id) {
        setActiveFormula(null);
      }
    },
    [setFormulas, activeFormula]
  );

  const duplicateFormula = useCallback(
    (id: string) => {
      const original = formulas.find((f) => f.id === id);
      if (!original) return null;

      const newFormula: CustomFormula = {
        ...original,
        id: `formula-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: `${original.name} (copia)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setFormulas((prev) => [newFormula, ...prev]);
      return newFormula;
    },
    [formulas, setFormulas]
  );

  const exportFormulas = useCallback(
    (ids?: string[]) => {
      const toExport = ids ? formulas.filter((f) => ids.includes(f.id)) : formulas;
      return JSON.stringify(toExport, null, 2);
    },
    [formulas]
  );

  const importFormulas = useCallback(
    (jsonString: string): { success: boolean; count: number; error?: string } => {
      try {
        const imported = JSON.parse(jsonString) as CustomFormula[];

        if (!Array.isArray(imported)) {
          return { success: false, count: 0, error: 'Formato inválido' };
        }

        const validFormulas = imported.filter((f) => f.name && f.expression && f.id);

        const newFormulas = validFormulas.map((f) => ({
          ...f,
          id: `formula-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          createdAt: f.createdAt || Date.now(),
          updatedAt: Date.now(),
        }));

        setFormulas((prev) => [...newFormulas, ...prev]);
        return { success: true, count: newFormulas.length };
      } catch (e) {
        return {
          success: false,
          count: 0,
          error: e instanceof Error ? e.message : 'Error al importar',
        };
      }
    },
    [setFormulas]
  );

  const generateShareUrl = useCallback(
    (id: string) => {
      const formula = formulas.find((f) => f.id === id);
      if (!formula) return null;

      const encoded = btoa(JSON.stringify(formula));
      return `${window.location.origin}/formulas?shared=${encoded}`;
    },
    [formulas]
  );

  const parseSharedFormula = useCallback((encoded: string): CustomFormula | null => {
    try {
      const decoded = JSON.parse(atob(encoded)) as CustomFormula;
      return decoded;
    } catch {
      return null;
    }
  }, []);

  const updateVariable = useCallback(
    (formulaId: string, variableName: string, updates: Partial<FormulaVariable>) => {
      setFormulas((prev) =>
        prev.map((f) =>
          f.id === formulaId
            ? {
                ...f,
                variables: f.variables.map((v) =>
                  v.name === variableName ? { ...v, ...updates } : v
                ),
                updatedAt: Date.now(),
              }
            : f
        )
      );
    },
    [setFormulas]
  );

  const addVariable = useCallback(
    (formulaId: string, variable: FormulaVariable) => {
      setFormulas((prev) =>
        prev.map((f) =>
          f.id === formulaId
            ? {
                ...f,
                variables: [...f.variables, variable],
                updatedAt: Date.now(),
              }
            : f
        )
      );
    },
    [setFormulas]
  );

  const removeVariable = useCallback(
    (formulaId: string, variableName: string) => {
      setFormulas((prev) =>
        prev.map((f) =>
          f.id === formulaId
            ? {
                ...f,
                variables: f.variables.filter((v) => v.name !== variableName),
                updatedAt: Date.now(),
              }
            : f
        )
      );
    },
    [setFormulas]
  );

  return {
    formulas,
    activeFormula,
    setActiveFormula,
    addFormula,
    updateFormula,
    deleteFormula,
    duplicateFormula,
    exportFormulas,
    importFormulas,
    generateShareUrl,
    parseSharedFormula,
    updateVariable,
    addVariable,
    removeVariable,
    count: formulas.length,
  };
}
