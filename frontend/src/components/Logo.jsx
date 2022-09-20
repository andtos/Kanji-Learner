import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Kanji_furigana.svg/1200px-Kanji_furigana.svg.png">
                <img src={logo} width="50" height="50" alt="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Kanji_furigana.svg/1200px-Kanji_furigana.svg.png" />
            </Wrapper>
        )
    }
}

export default Logo