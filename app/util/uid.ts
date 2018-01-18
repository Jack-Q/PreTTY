const state = {
    last: Date.now(),
};

export function getUid() {
    const time = Date.now();
    state.last = time > state.last ? time : state.last + 1;
    return state.last.toString(36);
}
