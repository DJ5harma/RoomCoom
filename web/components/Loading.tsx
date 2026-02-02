export const Loading = ({message} : {message?: string}) => {
  return (
    <div>{message ?? "Loading..."}</div>
  )
}
