import React from 'react'
import { connect } from 'react-redux'

// utility components

export class Square extends React.Component {
    render() {
        const { width, height, color, position } = this.props
        return <div style = {{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: color,
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}/>
    }
}

export class Circle extends React.Component {
    render() {
        const { radius, color, position } = this.props
        return <div style = {{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            borderRadius: '50%',
            backgroundColor: color,
            position: 'absolute',
            left: `${position.x - radius}px`,
            top: `${position.y - radius}px`,
        }}/>
    }
}

// game components

export class Ball extends React.Component {
    render() {
        const { position, radius } = this.props
        return <Circle
            radius = { radius }
            color = '#bbb'
            position = { position }
        />
    }
}

const ConnectedBall = connect(state => state.ball)(Ball)

export class Field extends React.Component {
    render() {
        const { width, height } = this.props
        return (
            <Square
                width = { width }
                height = { height }
                color = '#000000'
                position = {{
                    x: 0,
                    y: 0,
                }}
            />
        )
    }
}

const ConnectedField = connect(state => state.field)(Field)

export class Brick extends React.Component {
    render() {
        const { width, height, position } = this.props
        return <Square
            position = { position }
            width = { width }
            height = { height }
            color = "#ff0000"
        />
    }
}

export class Paddle extends React.Component {
    render() {
        const { width, height, position } = this.props
        return <Square
            position = { position }
            width = { width }
            height = { height }
            color = "#ffffff"
        />
    }
}

const ConnectedPaddle = connect(state => state.paddle)(Paddle)

export class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lastUpdate: new Date().getTime(),
        }
        this.gameLoop = this.gameLoop.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        window.requestAnimationFrame(this.gameLoop)
    }

    onKeyDown(e) {
        if(e.key === 'ArrowLeft') {
            this.props.leftDown()
        } else if(e.key === 'ArrowRight') {
            this.props.rightDown()
        }
    }

    onKeyUp(e) {
        if(e.key === 'ArrowLeft') {
            this.props.leftUp()
        } else if(e.key === 'ArrowRight') {
            this.props.rightUp()
        }
    }

    gameLoop() {
        window.requestAnimationFrame(this.gameLoop)
        const msPassed = new Date().getTime() - this.state.lastUpdate
        this.setState({
            lastUpdate: new Date().getTime(),
        })
        this.props.tick(msPassed / 1000)
    }

    render() {
        const { bricks } = this.props
        return (
            <div
                onKeyDown={ this.onKeyDown }
                onKeyUp={ this.onKeyUp }
                tabIndex="0"
            >
                <ConnectedField/>
                <ConnectedBall/>
                {
                    bricks.map(brick =>
                        <Brick
                            key = { brick.id }
                            position = { brick.position }
                            width = { brick.width }
                            height = { brick.height }
                        />
                    )
                }
                <ConnectedPaddle/>
            </div>
        )
    }
}

const mapStateToProps = state => ({ bricks: state.bricks })
const mapDispatchToProps = dispatch => ({
    tick: delta => dispatch({
        type: 'PROCESS_TIME',
        delta,
    }),
    leftDown: () => dispatch({
        type: 'LEFT_DOWN',
    }),
    leftUp: () => dispatch({
        type: 'LEFT_UP',
    }),
    rightDown: () => dispatch({
        type: 'RIGHT_DOWN',
    }),
    rightUp: () => dispatch({
        type: 'RIGHT_UP',
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
