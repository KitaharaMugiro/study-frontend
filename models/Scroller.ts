export function Scroller(target: any, speed: any, interval: any) {
    const _MAX_POSITION = target.scrollHeight - target.clientHeight;
    let _timeoutId: any = null;

    function _scrollByPosition(position: any) {
        if (_timeoutId !== null) return;

        let currentPosition = target.scrollLeft;
        if (position > _MAX_POSITION) position = _MAX_POSITION;

        const DIRECTION = position < currentPosition ? -1 : 1;
        const MOVEMENT = speed * DIRECTION;

        const onScroll = function () {
            currentPosition += MOVEMENT;

            const IS_COMPLETED =
                (DIRECTION === 1 && currentPosition >= position) ||
                (DIRECTION === -1 && currentPosition <= position)
                ;

            if (IS_COMPLETED) {
                target.scrollLeft = position;
                _timeoutId = null;

                return;
            }

            target.scrollLeft = currentPosition;
            _timeoutId = setTimeout(onScroll, interval);
        };

        onScroll();
    };

    function _scrollByElement(element: any) {
        const POSITION = element.offsetLeft
        _scrollByPosition(POSITION);
    }

    return {
        scrollByPosition: _scrollByPosition,
        scrollByElement: _scrollByElement,
    };
};