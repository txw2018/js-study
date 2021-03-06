const inBrowser = typeof window !== 'undefined';


let prev = Date.now();
function fallback(fn) {
    const curr = Date.now();
    const ms = Math.max(0, 16 - (curr - prev));
    const id = setTimeout(fn, ms);
    prev = curr + ms;
    return id;
}

const iRaf = window.requestAnimationFrame || fallback;
const iCancel = window.cancelAnimationFrame || window.clearTimeout;

function raf(fn) {
    return iRaf(fn)
}

function cancelRaf(id) {
    iCancel(id)
}
function isSameSecond(time1, time2) {
    return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function parseTimeData(time) {
    const days = Math.floor(time / DAY);
    const hours = Math.floor((time % DAY) / HOUR);
    const minutes = Math.floor((time % HOUR) / MINUTE);
    const seconds = Math.floor((time % MINUTE) / SECOND);
    const milliseconds = Math.floor(time % SECOND);

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
    };
}
function noop() {

}
const DEFAULT_OPTIONS = {
    time: 30 * 60 * 60 * 1000,
    autoStart: true,
    millisecond: false,
    changeFn: noop,
    finishFn: noop
}
class CountDown {
    constructor(options) {
        const { time, autoStart, millisecond, changeFn, finishFn } = { ...DEFAULT_OPTIONS, ...options }
        this.remain = 0
        this.time = time
        this.autoStart = autoStart
        this.millisecond = millisecond
        this.changeFn = changeFn
        this.finishFn = finishFn
        this.reset()
    }
    start() {
        debugger
        if (this.counting) {
            return;
        }
        this.counting = true;
        this.endTime = Date.now() + this.remain;
        this.tick();
    }
    pause() {
        this.counting = false;
        cancelRaf(this.rafId);
    }
    reset() {
        this.pause();
        this.remain = +this.time;

        if (this.autoStart) {
            this.start();
        }

    }
    tick() {
        if (!inBrowser) {
            return;
        }

        if (this.millisecond) {
            this.microTick();
        } else {
            this.macroTick();
        }
    }
    microTick() {
        this.rafId = raf(() => {
            if (!this.counting) {
                return;
            }

            this.setRemain(this.getRemain());

            if (this.remain > 0) {
                this.microTick();
            }
        });
    }
    macroTick() {
        this.rafId = raf(() => {
            if (!this.counting) {
                return;
            }

            const remain = this.getRemain();

            if (!isSameSecond(remain, this.remain) || remain === 0) {
                this.setRemain(remain);
            }

            if (this.remain > 0) {
                this.macroTick();
            }
        });
    }

    getRemain() {
        return Math.max(this.endTime - Date.now(), 0);
    }

    setRemain(remain) {
        this.remain = remain;
        this.changeFn(remain)
        if (remain === 0) {
            this.pause();
            this.finishFn()
        }
    }


}


