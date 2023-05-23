//Pages
import config from '~/config';
import Home from '~/pages/Home/Home';
import Following from '~/pages/Following/Following';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Upload/Upload';
import Search from '~/pages/Search/Search';
import Live from '~/pages/Live/Live';
import Explore from '~/pages/Explore/Explore';
import Login from '~/components/Auth/SignIn';
import Register from '~/components/Auth/SignUp';
import Comments from '~/pages/Comments/Comments';
//Layouts
import { HeaderOnly } from '~/layout';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.login, component: Login },
    { path: config.routes.signup, component: Register },
    { path: config.routes.comment, component: Comments },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
