export function replaceTitleByRef(ref, cls, newTitle) {
  ref.current.children[0].querySelector(cls).innerHTML = newTitle
}