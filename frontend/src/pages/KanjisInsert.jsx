
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class KanjisInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: '',
            meaning: '',
            reading: '',
        }
    }

    handleChangeInputCharacter = async event => {
        const character = event.target.value
        this.setState({ character })
    }

    handleChangeInputMeaning = async event => {
        const meaning = event.target.validity.valid
            ? event.target.value
            : this.state.meaning

        this.setState({ meaning })
    }

    handleChangeReading = async event => {
        const reading = event.target.value
        this.setState({ reading })
    }

    handleIncludeKanji = async () => {
        const { character, meaning, reading } = this.state
        
        const payload = { character, meaning, reading }

        await api.insertKanji(payload).then(res => {
            window.alert(`Kanji inserted successfully`)
            this.setState({
                character: '',
                meaning: '',
                reading: '',
            })
        })
    }

    render() {
        const { character, meaning, reading } = this.state
        return (
            <Wrapper>
                <Title>Create Kanji</Title>

                <Label>Character: </Label>
                <InputText
                    type="text"
                    value={character}
                    onChange={this.handleChangeInputCharacter}
                />
                <Label>Meaning: </Label>
                <InputText
                    type="text"
                    value={meaning}
                    onChange={this.handleChangeInputMeaning}
                />

                <Label>Reading: </Label>
                <InputText
                    type="text"
                    value={reading}
                    onChange={this.handleChangeReading}
                />

                

                <Button onClick={this.handleIncludeKanji}>Add Kanji</Button>
                <CancelButton href={'/kanjis/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default KanjisInsert