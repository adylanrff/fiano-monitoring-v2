import { Container, LinearProgress } from '@material-ui/core';
import Router from 'next/router'
import { useContext, useEffect } from "react";
import { authContext } from "../../services/auth";

export default function withAuthentication(WrappedComponent) {
    const RequiresAuthentication = props => {
        const { user } = useContext(authContext)

        useEffect(() => {
            if (!user) {
                Router.push("/login");
            }
        }, [user]);

        // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
        return user ? <WrappedComponent {...props} /> : <LinearProgress />;
    };

    return RequiresAuthentication;
};
