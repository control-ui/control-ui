# Features

```bash
npm i --save @control-ui/features
```

| Feature | Component | Handles | Status |
| :--- | :--- | :--- | :---: |
| User |  |  | |
|      | StoreAuth | Provider | ✅ |
|      | FormLogin | `handleLogin` | ✅ |
|      | PageLogin | `handleLogin` | ✅ |
|      | FormRegister | `handleRegister` | 🔵 |
|      | PageRegister | `handleRegister` | 🔵 |
|      | PageAccount | `handleUpdate` | 🔵 |
|      | MenuAccount |  | ✅ |
|      |  |  |  |
| Users |  |  |  |
|       | PageManage |  |  |
|       | FormDeleteOne |  |  |
|       | FormEditOne |  |  |
|       | FormAddOne |  |  |
|       | ListUsers |  |  |
|       | ListGroupedUsers |  |  |
| Content |  |  |  |
| Shop |  |  |  |
| POS |  |  |  |
| Analyze |  |  |  |
| Marketing |  |  |  |
| Media |  |  |  |
| Message |  |  |  |
| Settings |  |  |  |
| Dashboard |  |  |  |
|           | DashboardWidgets |  |  |
|           | DashboardNews |  |  |
|           | DashboardTicker |  |  |
|           | SharedDashboard |  |  |
|           | DashboardTabbed |  |  |
|  |  |  |  |
| DataGrid |  |  |  |
| DocTree |  |  |  |
| MarkdownView |  |  |  |
| FileExplorer |  |  |  |
| FileUpload |  |  |  |
| Pusher |  |  |  |
| FeatureManager |  |  |  |
| TimeAgo |  |  |  |
| I18n |  |  |  |
|      | MenuIconI18n |  | ✅ |


`@control-ui/admin`


| Feature | Component | Handler | Status |
| :--- | :--- | :--- | :---: |
| Api |  |  |  |
|     | apiRequest |  | ✅ |
|     | ApiProvider |  | ✅ |
|     | useApi | `buildUrl`<br>`request`<br>`post` | ✅ |
|     | progressHandler |  | 🔵 |
|     | LoadingProgress |  | 🔵 |
|     | TransError |  | 🔵 |
| User |  |  |  |
|      | PageLogin | w/ Api | ✅ |
|      | UserConnect | `useLogin`<br>`useLogout` | ✅ |

## User

### StoreAuth

- context:
    - `loggedIn`:`{boolean}`
    - `authToken`:`{boolean|string}`
    - `authAllowed`:`{boolean|object}`
- action creator:
    - `doLogin`:`{function({username, password}): Promise}`
    - `doLogout`
- reducer actions:
    - `LOGIN`
    - `LOGOUT`
