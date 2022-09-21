
import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateKanji extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/kanjis/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteKanji extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the kanji ${this.props.id} permanently?`,
            )
        ) {
            api.deleteKanjiById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class KanjisList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kanjis: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllKanjis().then(kanjis => {
            this.setState({
                kanjis: kanjis.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { kanjis, isLoading } = this.state
        console.log('TCL: KanjisList -> render -> kanjis', kanjis)

        const columns = [
            {
                Header: 'Character',
                accessor: 'character',
                filterable: true,
            },
            
            {
                Header: 'Meaning',
                accessor: 'meaning',
                filterable: true,
            },
            {
                Header: 'Reading',
                accessor: 'reading',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteKanji id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateKanji id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!kanjis.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={kanjis}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default KanjisList