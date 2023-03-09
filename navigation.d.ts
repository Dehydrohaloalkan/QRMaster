import { RootStackParamList } from './navigation/NavigationTypes'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}