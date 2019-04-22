// Use with pipe operator:
// (e => setTitle(e.target.value)) |> preventDefault

export function preventDefault(f) {
  return (event) => {
    event.preventDefault();
    f(event);
  };
}
