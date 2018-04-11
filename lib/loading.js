'use strict';

// let frame = [
//     "-",
//     "\\",
//     "|",
//     "/"
// ];
let frame = [
    "\x1b[37m[----]",
    "\x1b[37m[\x1b[36m>\x1b[37m---]",
    "\x1b[37m[-\x1b[36m>\x1b[37m--]",
    "\x1b[37m[--\x1b[36m>\x1b[37m-]",
    "\x1b[37m[---\x1b[36m>\x1b[37m]"
];
let frame_len = frame.length;
let frame_index = 0;
let frame_size = 6;
let st;

function start() {
    st = setInterval(()=>{
        frame_index = frame_index >= frame_len - 1 ? 0 : frame_index + 1;
        process.stdout.write(frame[frame_index] + "\x1b[0m\r");
    }, 100);
}

function stop() {
    clearTimeout(st);
    process.stdout.write("\b".repeat(frame_size) + "\r\n");
}

module.exports = {start, stop};
