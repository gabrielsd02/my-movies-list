export type RootDrawerParamList = {
    Home: undefined;
    Search: undefined;
    CategoryMovies: undefined;
    MovieDetails: { 
        id?: number;
        lastRoute?: "Home" | "Search" | "CategoryMovies"; 
    };
};