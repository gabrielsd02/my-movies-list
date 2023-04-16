export type RootDrawerParamList = {
    Home: undefined;
    Search: undefined;
    CategoryMovies: undefined;
    Favorites: undefined;
    MovieDetails: { 
        id?: number;
        lastRoute?: "Home" | "Search" | "CategoryMovies" | "Favorites"; 
    };
};