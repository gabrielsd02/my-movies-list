import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
    Home: undefined;
    Search: undefined;
    MovieDetails: { 
        id?: number;
        lastRoute?: "Home" | "Search"; 
    };
};