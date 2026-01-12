import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAIovw5UmprR0ML9USltZxIJlB1KGLiLlo",
    authDomain: "todo-app-6deba.firebaseapp.com",
    projectId: "todo-app-6deba",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
