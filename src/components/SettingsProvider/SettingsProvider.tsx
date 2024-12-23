import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { FieldSize, SettingsAction, SettingsState } from '../../types';

const SettingsContext = createContext({} as SettingsState);
const SettingsDispatchContext = createContext({} as Dispatch<SettingsAction>);

const initialSettings = {
  invertControls: false,
  bombsCount: 20,
  fieldSize: {
    width: 10,
    height: 10,
  } as FieldSize,
  opened: true,
};

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

function settingsReducer(settings: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'setInvertControls':
      return {
        ...settings,
        invertControls: Boolean(action.value),
      };
    case 'setFieldSize':
      return {
        ...settings,
        fieldSize: action.value as FieldSize,
      };
    case 'setBombsCount':
      return {
        ...settings,
        bombsCount: +action.value,
      };
    case 'setOpened':
      return {
        ...settings,
        opened: Boolean(action.value),
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export function SettingsProvider({ children }: {children: ReactNode}) {
  const [settings, dispatch] = useReducer(
    settingsReducer,
    initialSettings,
  );

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}
