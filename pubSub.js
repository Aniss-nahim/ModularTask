var pubSub = (function(){
    // contains subscribed events
    var events = {};

    function subscribe(eventName, func){
        events[eventName] = events[eventName] || [];
        events[eventName].push(func);
    }

    function unsubscribe(eventName, func){
        if(events[eventName]){
            for(index in events[eventName]){
                if(events[eventName][i] === func){
                    events[eventName].splice(index,1);
                    break;
                }
            }
        }
    }

    function emit (eventName, parms){
        console.log(events)
        if(events[eventName]){
            
            events[eventName].forEach(function(func){
                func(parms);
            });
        }
    }

    return {
        subscribe,
        unsubscribe,
        emit
    }
})();