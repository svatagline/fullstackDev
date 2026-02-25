const dist = [1, 8, 6, 2, 5, 4, 8, 3, 7]

const l = (...rest) => { console.log(...rest) }
let index = 0
let maxDepth = 0
while (index < dist.length) {
    for (let i = index + 1; i < dist.length; i++) {
        let lowestNum = dist[i] - dist[index] > 0 ? dist[index] : dist[i]
        l('============>', dist[i], dist[index], lowestNum * (i - index))
        let depth = lowestNum * (i - index)

        if (depth > maxDepth) {
            maxDepth = depth
        }
    }
    index++
}

l('===============================================>', maxDepth)






var maxArea = function (height) {
    let index = 0
    let maxDepth = 0
    while (index < height.length) {
        for (let i = index + 1; i < height.length; i++) {
            let lowestNum = height[i] - height[index] > 0 ? height[index] : height[i]
            let depth = lowestNum * (i - index)

            if (depth > maxDepth) {
                maxDepth = depth
            }
        }
        index++
    }

    return maxDepth
} 