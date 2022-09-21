
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
    margin: 15px;
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

class KanjisImport extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: '',
            meaning: '',
            reading: '',
        }
        this.states=[]
    }

    handleChangeImportCharacter = async event => {
        const character = event.target.value
        this.setState({ character, meaning: ' ', reading: ' ' })
    }

   

    handleImportKanji = async () => {
        
        const { character, meaning, reading } = this.state
        
        const payload = { character, meaning , reading  }

        await api.insertKanji(payload).then(res => {
            window.alert(`Kanji imported successfully`)
            this.setState({
                character: '',
                meaning: '',
                reading: '',
            })
        })
    }

    render() {
        const { character } = this.state
        return (
            <Wrapper>
                <Title>Import Kanjis</Title>

                <Label>Paste Japanese Text: </Label>
                <InputText
                    type="text"
                    value={character}
                    onChange={this.handleChangeImportCharacter}
                />

                

                <Button onClick={this.handleImportKanji}>Import Kanjis</Button>
                <CancelButton href={'/kanjis/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default KanjisImport