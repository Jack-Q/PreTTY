const state = {
    last: Date.now(),
};

export function getUid() {
    var time = Date.now();
    var last = state.last || time;
    state.last = time > last ? time : time + 1;
    return state.last.toString(36);
}

