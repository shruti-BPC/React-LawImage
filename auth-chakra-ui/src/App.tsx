import {
    AuthProvider,
    Authenticated,
    GitHubBanner,
    Refine,
} from "@refinedev/core";
import {
    AuthPage,
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    notificationProvider,
} from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons";

import { PostCreate, PostEdit, PostList, PostShow, ProjectList } from "./pages";

import { FileList } from "./pages/files";
import FileDetails from "./components/FileDetails";
import FileBatch from "./components/FileBatch";

/**
 *  mock auth credentials to simulate authentication
 */
const authCredentials = {
    email: "demo@refine.dev",
    password: "demodemo",
};

const App: React.FC = () => {
    const authProvider: AuthProvider = {
        login: async ({ providerName, email }) => {
            if (providerName === "google") {
                window.location.href =
                    "https://accounts.google.com/o/oauth2/v2/auth";
                return {
                    success: true,
                };
            }

            if (providerName === "github") {
                window.location.href =
                    "https://github.com/login/oauth/authorize";
                return {
                    success: true,
                };
            }

            if (email === authCredentials.email) {
                localStorage.setItem("email", email);
                //send semail and pwd to backend and get response token if valid along with if the person is manager or project
                
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: {
                    message: "Login failed",
                    name: "Invalid email or password",
                },
            };
        },
        register: async  (params: { email: string; password:string;})=> {
            if (params.email === authCredentials.email && params.password) {
                localStorage.setItem("email", params.email);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
            return {
                success: false,
                error: {
                    message: "Register failed",
                    name: "Invalid email or password",
                },
            };
        },
        updatePassword: async  (params: { email: string; password:string;}) => {
            if (params.password === authCredentials.password) {
                //we can update password here
                return {
                    success: true,
                };
            }
            return {
                success: false,
                error: {
                    message: "Update password failed",
                    name: "Invalid password",
                },
            };
        },
        forgotPassword: async (params: { email: string; password:string;}) => {
            if (params.email === authCredentials.email) {
                //we can send email with reset password link here
                return {
                    success: true,
                };
            }
            return {
                success: false,
                error: {
                    message: "Forgot password failed",
                    name: "Invalid email",
                },
            };
        },
        logout: async () => {
            localStorage.removeItem("email");
            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async (error: any) => {
            console.error(error);
            return { error };
        },
        check: async () =>
            localStorage.getItem("email")
                ? {
                      authenticated: true,
                  }
                : {
                      authenticated: false,
                      error: {
                          message: "Check failed",
                          name: "Not authenticated",
                      },
                      logout: true,
                      redirectTo: "/login",
                  },
        getPermissions: async () => ["admin"],
        getIdentity: async () => ({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
    };

    return (
        <BrowserRouter>
            <GitHubBanner />
            <ChakraProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    notificationProvider={notificationProvider()}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                            edit: "/posts/edit/:id",
                            create: "/posts/create",
                        },
                        {
                            name: "files",
                            list: "/files",
                            show:"/files/:id" ,
                            create:"/files/:id/:color" ,
                          
                           
                        },
                        
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    key="authenticated-routes"
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />

                            <Route path="/posts">
                                <Route index element={<PostList />} />
                                <Route path="create" element={<PostCreate />} />
                                <Route path="edit/:id" element={<PostEdit />} />
                                <Route path="show/:id" element={<PostShow />} />
                            </Route>
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="files" />
                                }
                            />
                            <Route path="/files" element={  <FileList /> } />
                            <Route path="/files/:id" element={  <FileDetails /> } />
                            <Route path="/files/:id/:color" element={  <FileBatch /> } />
                        </Route>
                        

                        <Route
                            element={
                                <Authenticated
                                    key="auth-pages"
                                    fallback={<Outlet />}
                                >
                                    <NavigateToResource resource="posts" />
                                   
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        formProps={{
                                            defaultValues: {
                                                ...authCredentials,
                                            },
                                        }}
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: <IconBrandGoogle />,
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: <IconBrandGithub />,
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <AuthPage
                                        type="register"
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: <IconBrandGoogle />,
                                            },
                                            {
                                                name: "github",
                                                label: "Sign in with GitHub",
                                                icon: <IconBrandGithub />,
                                            },
                                        ]}
                                    />
                                }
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated key="catch-all">
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
