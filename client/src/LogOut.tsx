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
    <button onClick={handleLogOut}> Log Out</button>
  </div>
)
}