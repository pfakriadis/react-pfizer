export const sortArrayLatest = (array) => {
    if (array.length === 0) {
        return undefined;
    }
    return array.sort(function(a, b) {
        let x = parseInt(a.id);
        let y = parseInt(b.id);
        return y - x;
    });
}