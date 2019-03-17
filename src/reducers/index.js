const BRICK_WIDTH = 100
const BRICK_HEIGHT = 30
const BRICK_OFFSET = 10

const FIELD_WIDTH = 1000
const FIELD_HEIGHT = 700

const BALL_SPEED = 150
const BALL_RADIUS = 50

const PADDLE_WIDTH = 150
const PADDLE_HEIGHT = 10
const PADDLE_SPEED = 300

const startingBall = {
    position: {
        x: FIELD_WIDTH / 2,
        y: FIELD_HEIGHT / 2 + 100,
    },
    radius: BALL_RADIUS,
    speed: {
        x: 0,
        y: BALL_SPEED,
    },
}

const initState = () => {
    const state = {
        bricks: [],
        field: {
            width: FIELD_WIDTH,
            height: FIELD_HEIGHT,
        },
        paddle: {
            width: PADDLE_WIDTH,
            height: PADDLE_WIDTH,
            position: {
                x: FIELD_WIDTH / 2 - PADDLE_WIDTH / 2,
                y: FIELD_HEIGHT - PADDLE_HEIGHT * 4,
            },
        },
        ball: startingBall,
        keysPressed: [],
        ballLosses: 0,
    }

    let brickId = 0
    for(let x = 0; x < 8; x++) {
        for(let y = 0; y < 2; y++) {
            const xoff = FIELD_WIDTH / 8
            const brick = {
                id: brickId++,
                position: {
                    x: x * xoff,
                    y: (y + 1) * (BRICK_HEIGHT + BRICK_OFFSET),
                },
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT,
            }
            state.bricks.push(brick)
        }
    }
    return state
}

function square_collides_circle(square, circle) {
    return (((circle.position.y + circle.radius >= square.position.y) &&
            (circle.position.y - circle.radius <= square.position.y + square.height)) ||

            (circle.position.y + circle.radius >= square.position.y) &&
            (circle.position.y - circle.radius <= square.position.y + square.height)
    )
    &&
    circle.position.x >= square.position.x &&
    circle.position.x <= square.position.x + square.width
}

const reducer = (state = initState(), action) => {
    switch (action.type) {
    case 'PROCESS_TIME':
    {
        const paddleSpeed = {
            x: 0,
        }
        if(state.keysPressed.indexOf('LEFT') !== -1) {
            paddleSpeed.x = -PADDLE_SPEED
        } else if(state.keysPressed.indexOf('RIGHT') !== -1) {
            paddleSpeed.x = PADDLE_SPEED
        }

        const paddleNewPos = {
            x: state.paddle.position.x + paddleSpeed.x * action.delta,
            y: state.paddle.position.y,
        }

        let newBall = { ...state.ball } // copy of ball

        newBall.position = {
            x: newBall.position.x + newBall.speed.x * action.delta,
            y: newBall.position.y + newBall.speed.y * action.delta,
        }

        /* ball-paddle collision */
        if(square_collides_circle(state.paddle, newBall)) {
            newBall.speed.y = -newBall.speed.y
            newBall.speed.x = -newBall.speed.x + (newBall.position.x - (state.paddle.position.x + state.paddle.width / 2))
        }

        const newBricks = []

        /* ball-brick collisions */
        for(const brick of state.bricks) {
            if(square_collides_circle(brick, newBall)) {
                newBall.speed.y = -newBall.speed.y
            } else {
                newBricks.push(brick)
            }
        }

        /* sidewall collisions */
        if((newBall.position.x >= state.field.width - BALL_RADIUS) ||
            (newBall.position.x <= BALL_RADIUS)) {
            newBall.speed.x = -newBall.speed.x
        }

        /* top wall collision */
        if(newBall.position.y <= BALL_RADIUS) {
            newBall.speed.y = -newBall.speed.y
        }

        let losses = state.ballLosses

        /* bottom wall collision */
        if(newBall.position.y >= state.field.height - BALL_RADIUS) {
            losses++
            newBall = startingBall
        } else {
            newBall.position = {
                x: newBall.position.x + newBall.speed.x * action.delta,
                y: newBall.position.y + newBall.speed.y * action.delta,
            }
        }

        const newState = {
            ...state,
            bricks: newBricks,
            ball: newBall,
            paddle: {
                ...state.paddle,
                position: paddleNewPos, // move paddle
            },
            ballLosses: losses,
        }
        return newState
    }
    case 'LEFT_DOWN':
        return {
            ...state,
            keysPressed: [
                ...state.keysPressed,
                'LEFT',
            ],
        }
    case 'LEFT_UP':
        return {
            ...state,
            keysPressed: state.keysPressed.filter(key => key != 'LEFT'),
        }
    case 'RIGHT_DOWN':
        return {
            ...state,
            keysPressed: [
                ...state.keysPressed,
                'RIGHT',
            ],
        }
    case 'RIGHT_UP':
        return {
            ...state,
            keysPressed: state.keysPressed.filter(key => key != 'RIGHT'),
        }

    default:
        return state
    }
}

export default reducer
