import React, { Suspense, lazy } from "react";
import Spinner from "./components/spinner";
import Layout from "./components/layout";

// ** Import Route Providers
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const Home = lazy(() => import("./pages/index"));

const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Layout>
                        <Route path="/" exact component={Home} />
                        <Route path="/home" exact component={Home} />
                        {/* <Route path="*" /> */}
                    </Layout>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
