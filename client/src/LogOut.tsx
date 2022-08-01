import Button from "@mui/material/Button";

export interface inputData {
  login: boolean;
  username: string;
  userId: string;
}

export default function LogOut (props: any) {

  function handleLogOut (e: any) {
    props.onSubmit({
      login: false,
      username: '',
      userId: ''
    })
    props.onClick();
  }

return (
  <div>
    <Button color="primary" variant="outlined" onClick={handleLogOut}>Log Out</Button>
  </div>
)
}