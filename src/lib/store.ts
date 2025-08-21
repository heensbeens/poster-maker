import { create } from 'zustand';

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  properties: {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: string;
    color?: string;
    backgroundColor?: string;
    imageUrl?: string;
    shapeType?: 'rectangle' | 'circle' | 'star' | 'triangle';
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWidth?: number;
    strokeEnabled?: boolean;
  };
}

export interface HistoryState {
  past: CanvasElement[][];
  present: CanvasElement[];
  future: CanvasElement[][];
}

interface PosterMakerStore {
  // Canvas state
  elements: CanvasElement[];
  selectedElementId: string | null;
  selectedElementIds: string[];
  canvasSize: { width: number; height: number };
  
  // History
  history: HistoryState;
  
  // Actions
  addElement: (element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  selectMultipleElements: (ids: string[]) => void;
  toggleElementSelection: (id: string) => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, width: number, height: number) => void;
  rotateElement: (id: string, rotation: number) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  clearCanvas: () => void;
  
  // Alignment actions for multiple elements
  alignElementsHorizontally: (alignType: 'left' | 'center' | 'right') => void;
  alignElementsVertically: (alignType: 'top' | 'center' | 'bottom') => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial sample elements to demonstrate the poster maker
const initialElements: CanvasElement[] = [
  {
    id: 'background-1',
    type: 'background',
    x: 0,
    y: 0,
    width: 573,
    height: 668.5,
    rotation: 0,
    zIndex: -1, // Negative zIndex to ensure background stays behind all other elements
    properties: {
      backgroundColor: '#FCFCFD',
    },
  },
  {
    id: 'circle-1',
    type: 'shape',
    x: 161.5,
    y: 209.25,
    width: 250,
    height: 250,
    rotation: 0,
    zIndex: 1,
    properties: {
      shapeType: 'circle',
      fillColor: '#7B42F6',
      fillOpacity: 1,
      strokeColor: '#000000',
      strokeWidth: 0,
    },
  },
  {
    id: 'text-1',
    type: 'text',
    x: 186.5,
    y: 284.25,
    width: 200,
    height: 100,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: 'This is an\namazing\ndesign to be\nworking on!',
      fontSize: 20,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
    },
  },
  {
    id: 'text-3',
    type: 'text',
    x: 473,
    y: 59.25,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: '#newday',
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'left',
    },
  },
  {
    id: 'text-4',
    type: 'text',
    x: 53,
    y: 629.25,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: 'Company',
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'left',
    },
  },
  {
    id: 'text-5',
    type: 'text',
    x: 473,
    y: 629.25,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: '@user.name',
      fontSize: 14,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#7B42F6',
      textAlign: 'right',
    },
  },
];

export const usePosterMakerStore = create<PosterMakerStore>((set, get) => ({
  elements: initialElements,
  selectedElementId: null,
  selectedElementIds: [],
  canvasSize: { width: 573, height: 668.5 },
  
  history: {
    past: [],
    present: initialElements,
    future: [],
  },
  
  addElement: (elementData) => {
    const newElement: CanvasElement = {
      ...elementData,
      id: generateId(),
    };
    
    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newElement.id,
    }));
    
    get().saveToHistory();
  },
  
  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      ),
    }));
  },
  
  deleteElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
      selectedElementIds: state.selectedElementIds.filter(existingId => existingId !== id)
    }));
    
    get().saveToHistory();
  },
  
  selectElement: (id) => {
    set({ 
      selectedElementId: id,
      selectedElementIds: id ? [id] : []
    });
  },

  selectMultipleElements: (ids) => {
    set({ 
      selectedElementId: ids.length === 1 ? ids[0] : null,
      selectedElementIds: ids
    });
  },

  toggleElementSelection: (id) => {
    set((state) => {
      const isSelected = state.selectedElementIds.includes(id);
      let newSelectedIds: string[];
      
      if (isSelected) {
        newSelectedIds = state.selectedElementIds.filter(existingId => existingId !== id);
      } else {
        newSelectedIds = [...state.selectedElementIds, id];
      }
      
      return {
        selectedElementId: newSelectedIds.length === 1 ? newSelectedIds[0] : null,
        selectedElementIds: newSelectedIds
      };
    });
  },
  
  moveElement: (id, x, y) => {
    get().updateElement(id, { x, y });
  },
  
  resizeElement: (id, width, height) => {
    get().updateElement(id, { width, height });
  },
  
  rotateElement: (id, rotation) => {
    get().updateElement(id, { rotation });
  },
  
  bringForward: (id) => {
    set((state) => {
      const elementIndex = state.elements.findIndex((el) => el.id === id);
      if (elementIndex === -1 || elementIndex === state.elements.length - 1) return state;
      
      const newElements = [...state.elements];
      const element = newElements[elementIndex];
      newElements.splice(elementIndex, 1);
      newElements.splice(elementIndex + 1, 0, element);
      
      return { elements: newElements };
    });
    
    get().saveToHistory();
  },
  
  sendBackward: (id) => {
    set((state) => {
      const elementIndex = state.elements.findIndex((el) => el.id === id);
      if (elementIndex <= 0) return state;
      
      const newElements = [...state.elements];
      const element = newElements[elementIndex];
      newElements.splice(elementIndex, 1);
      newElements.splice(elementIndex - 1, 0, element);
      
      return { elements: newElements };
    });
    
    get().saveToHistory();
  },
  
  clearCanvas: () => {
    set({ elements: [], selectedElementId: null, selectedElementIds: [] });
    get().saveToHistory();
  },

  alignElementsHorizontally: (alignType) => {
    const state = get();
    const selectedElements = state.elements.filter(el => state.selectedElementIds.includes(el.id));
    
    if (selectedElements.length <= 1) return;
    
    const canvasWidth = 573;
    
    selectedElements.forEach(element => {
      let newX = element.x;
      
      switch (alignType) {
        case 'left':
          newX = 0;
          break;
        case 'center':
          newX = (canvasWidth - element.width) / 2;
          break;
        case 'right':
          newX = canvasWidth - element.width;
          break;
      }
      
      get().updateElement(element.id, { x: newX });
    });
    
    get().saveToHistory();
  },

  alignElementsVertically: (alignType) => {
    const state = get();
    const selectedElements = state.elements.filter(el => state.selectedElementIds.includes(el.id));
    
    if (selectedElements.length <= 1) return;
    
    const canvasHeight = 668.5;
    
    selectedElements.forEach(element => {
      let newY = element.y;
      
      switch (alignType) {
        case 'top':
          newY = 0;
          break;
        case 'center':
          newY = (canvasHeight - element.height) / 2;
          break;
        case 'bottom':
          newY = canvasHeight - element.height;
          break;
      }
      
      get().updateElement(element.id, { y: newY });
    });
    
    get().saveToHistory();
  },
  
  saveToHistory: () => {
    const { elements, history } = get();
    set({
      history: {
        past: [...history.past, history.present],
        present: elements,
        future: [],
      },
    });
  },
  
  undo: () => {
    const { history } = get();
    if (history.past.length === 0) return;
    
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    
    set({
      elements: previous,
      history: {
        past: newPast,
        present: previous,
        future: [history.present, ...history.future],
      },
    });
  },
  
  redo: () => {
    const { history } = get();
    if (history.future.length === 0) return;
    
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    
    set({
      elements: next,
      history: {
        past: [...history.past, history.present],
        present: next,
        future: newFuture,
      },
    });
  },
}));
