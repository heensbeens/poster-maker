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
    strokeColor?: string;
    strokeWidth?: number;
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
  canvasSize: { width: number; height: number };
  
  // History
  history: HistoryState;
  
  // Actions
  addElement: (element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, x: number, y: number) => void;
  resizeElement: (id: string, width: number, height: number) => void;
  rotateElement: (id: string, rotation: number) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  clearCanvas: () => void;
  
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
    width: 800,
    height: 600,
    rotation: 0,
    zIndex: 0,
    properties: {
      backgroundColor: '#ffffff',
    },
  },
  {
    id: 'circle-1',
    type: 'shape',
    x: 250,
    y: 150,
    width: 300,
    height: 300,
    rotation: 0,
    zIndex: 1,
    properties: {
      shapeType: 'circle',
      fillColor: '#8b5cf6',
      strokeColor: '#000000',
      strokeWidth: 0,
    },
  },
  {
    id: 'text-1',
    type: 'text',
    x: 300,
    y: 200,
    width: 200,
    height: 120,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: 'This is an\namazing\ndesign to be\nworking on!',
      fontSize: 24,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#ffffff',
      textAlign: 'center',
    },
  },
  {
    id: 'text-2',
    type: 'text',
    x: 350,
    y: 350,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: 'Designer',
      fontSize: 18,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#ffffff',
      textAlign: 'center',
    },
  },
  {
    id: 'text-3',
    type: 'text',
    x: 650,
    y: 50,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: '#newday',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'left',
    },
  },
  {
    id: 'text-4',
    type: 'text',
    x: 50,
    y: 500,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: 'Company',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'left',
    },
  },
  {
    id: 'text-5',
    type: 'text',
    x: 650,
    y: 500,
    width: 100,
    height: 30,
    rotation: 0,
    zIndex: 2,
    properties: {
      text: '@user.name',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: 'normal',
      color: '#000000',
      textAlign: 'right',
    },
  },
];

export const usePosterMakerStore = create<PosterMakerStore>((set, get) => ({
  elements: initialElements,
  selectedElementId: null,
  canvasSize: { width: 800, height: 600 },
  
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
    }));
    
    get().saveToHistory();
  },
  
  selectElement: (id) => {
    set({ selectedElementId: id });
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
    set({ elements: [], selectedElementId: null });
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
