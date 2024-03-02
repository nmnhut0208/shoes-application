import { useUserContext, actions } from "~user";
import { useTaskContext, resetHeader } from "~task";

function Thoat() {
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  dispatchUser(
    actions.setOriginalSettings({
      userName: "",
      userPassword: "",
      isLogin: true,
      userPoolAccess: {},
    })
  );
  resetHeader(dispatchTask);
}

export default Thoat;
