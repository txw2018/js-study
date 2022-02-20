class EventBus {
    constructor() {
        this.events = {}
    }
    on(type,handler){
        if(!this.events[type]){
            this.events[type] = []
        }
        this.events[type].push(handler)
    }
    emit(type,...args){
        if(this.events[type]){
            this.events[type].forEach( fn => fn.apply(this,args))
        }
    }
    off(type,handler){
        if(this.events[type]){
            this.events[type] =  this.events[type].filter(fn => fn !== handler)
        }
    }
    once(type,handler){
        const fn  = () => {
            handler()
            this.off(type,handler)
        }
        this.on(type,fn)
    }
}
