const players = [
    { name: 'Alice', score: 10 },
    { name: 'Bob', score: 20 }
]

const copy = [{ ...players }]
copy[0].score = 99
copy.push({ name: 'Charlie', score: 30 })

console.log(players[0].score)