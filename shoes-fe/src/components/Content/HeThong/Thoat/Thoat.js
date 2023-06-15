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
  //   console.log("Thoat: re-render", stateUser);
  resetHeader(dispatchTask);
  //   return <></>;
}

export default Thoat;
