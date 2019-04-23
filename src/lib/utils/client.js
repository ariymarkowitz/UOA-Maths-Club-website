// Use with pipe operator:
// (e => setTitle(e.target.value)) |> preventDefault

export function stopPropagation(f) {
  return (event) => {
    f(event);
    event.stopPropagation();
    return false;
  };
}
