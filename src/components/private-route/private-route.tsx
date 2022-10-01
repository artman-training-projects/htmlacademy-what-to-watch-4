import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { AuthorizationStatus, Pages } from "../../const";
import { getAuthStatus } from "../../reducer/user/selectors";
import Loading from "../loading/loading";
import { FC, ReactNode } from "react";

interface Props {
	auth: {
		status: string;
		error: boolean;
		isProgress: boolean;
	};
	exact: boolean;
	path: string;
	render: (routeProps: any | null) => ReactNode;
}

const PrivateRoute: FC<Props> = (props: Props) => {
	const { auth, exact, path, render } = props;

	const isAuth = auth.status === AuthorizationStatus.AUTH;
	const isProgress = auth.isProgress;

	return (
		<Route
			path={path}
			handle={(routeProps) => {
				if (isAuth && !isProgress) {
					return render(routeProps);
				}

				if (isProgress) {
					return <Loading />;
				}

				return <Navigate to={`${Pages.SIGN_IN}`} />;
			}}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: getAuthStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
