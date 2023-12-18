import "./App.css";
import ChatBox from "./Chat";
import store from "./Redux/store";
import { Provider } from "react-redux";

export default function App() {
	return (
		<Provider store={store}>
			<ChatBox />
		</Provider>
	);
}
