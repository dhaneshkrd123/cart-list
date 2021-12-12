import React from "react";
import { Button, Form, Modal, Table, Dropdown, } from "react-bootstrap";

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            items: [],
            twd: ["idd", "named"],
            inp: "",
            count: 1,
            showTodo: false,
            val: "",
            result: "",
            id: "",
            deleteId: "",
            editIdd: "",
            show: false,
            showModaledit: false,
            showModaldelete: false,
            showModalDele: false,
            showModal3: false,
            showOpt: false,
            inputText: {
                key: "",
                text: "",
                check: true,
                editMode: true,
                checkD: true,
            },
        };
    }

    componentDidMount() {
        const tasks = localStorage.getItem("item")
            ? JSON.parse(localStorage.getItem("item"))
            : "";
        this.setState({ items: tasks });
    }
    handleInput = (e) => {
        e.preventDefault();
        this.setState({
            inputText: {
                text: e.target.value,
                key: Date.now(),
                check: true,
                editMode: true,
                checkD: true,
            },
        });
    };
    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.inputText;
        if (newItem.text !== "") {
            this.state.showOpt = true;
            const existingItems = [...this.state.items, newItem];
            this.setState({
                items: existingItems,
                inputText: {
                    key: "",
                    text: "",
                    editMode: true,
                    check: false,
                },
                show: false,
            });
            localStorage.setItem("item", JSON.stringify(this.state.items));
        }
        console.log(this.state.items)
    };
    Add = () => {
        this.setState({ show: true });
        console.log(this.state.items)
    };
    DelAll = () => {
        var changedItem = this.state.items.filter((itm) => itm.checkD !== false);
        this.setState({ items: changedItem });
        localStorage.setItem("item", JSON.stringify(changedItem));
        this.setState({ showModalDele: false });
        this.setState({ showTodo: false });
    };
    cancelAll = () => {
        this.setState({ showModalDele: false });
        this.setState({ showTodo: false });
    };
    DeleteAll = () => {
        this.setState({ showTodo: true });
        this.setState((prev, props) => ({
            count: prev.count + 1,
        }));
        var countValue = this.state.count;
        if (countValue % 2 === 0) {
            this.setState({ showModalDele: true });
        }
    };
    Ascend = () => {
        var nsort = this.state.items;
        nsort.toString().toUpperCase();
        nsort.sort((a, b) => (a.text.toUpperCase() > b.text.toUpperCase() ? 1 : -1));
        this.setState({ items: nsort });
        localStorage.setItem("item", JSON.stringify(this.state.items));
    };
    Descend = () => {

    };
    onChange = (i) => {
        const val = i
        localStorage.setItem('selectedSort', val)
        this.setState({ selectedValue: val })
        this.sortBy(val)

    }
    compareBy = key => {
        return function (a, b) {
            if (key === 'id') return a[key] - b[key]
            else {
                if (a[key] < b[key]) return -1
                if (a[key] > b[key]) return 1
            }
            return 0
        }
    }

    sortBy = key => {
        const tasks = localStorage.getItem("item")
            ? JSON.parse(localStorage.getItem("item"))
            : "";
        //this.setState({ items: tasks });
        let arrayCopy = [...tasks]
        arrayCopy.sort(this.compareBy(key))
        this.setState({ tasks: arrayCopy })
        localStorage.setItem('taskArray', JSON.stringify(arrayCopy))
    }

    Inp = (x) => {
        this.setState({ inp: x.target.value });
    };
    getRecord = (id) => {
        const product = this.state.items.find((itm) => itm.key === id);
        return product;
    };
    edit = (id) => {
        this.setState({ showModaledit: true });
        this.setState({ val: id });
        console.log(id)
        const temporary = this.state.items;
        const index = temporary.indexOf(this.getRecord(id));
        const selectRecord = temporary[index];
        this.setState({
            result: selectRecord["text"],
        });
    };
    updateitems = (a) => {
        const Val = this.state.val;
        if (this.state.inp !== "") {
            const saveRec = this.state.items;
            const index = saveRec.indexOf(this.getRecord(Val));
            const Record = saveRec[index];
            Record["text"] = this.state.inp;
            this.setState({
                items: this.state.items,
                text: "",
            });
        }
        this.setState({ showModaledit: false });
        localStorage.setItem("item", JSON.stringify(this.state.items));
    };
    cancel = () => {
        this.setState({ show: false });
    };
    cancelItem = () => {
        this.setState({ showModaledit: false });
    };
    cancelData = () => {
        this.setState({ showModaldelete: false });
    };
    inputText = (e) => {
        this.setState({ input: e.target.value });
    };
    delete = (id) => {
        this.setState({ showModal3: true });
        this.setState({ deleteId: id });
    };
    cDelete = (i) => {
        var Id = this.state.deleteId;
        var fiteredItems = this.state.items.filter((itm) => itm.key !== Id);
        this.setState({ items: fiteredItems });
        this.setState({ showModal3: false });
        localStorage.setItem("item", JSON.stringify(fiteredItems));
    };
    checkDelete = (item) => {
        let newItems = this.state.items;
        let itemIndex = newItems.indexOf(item);
        newItems[itemIndex].checkD = !item.checkD;
        this.setState({ items: newItems });
    };

    render() {
        return (
            <div >


                <h1>TODO LIST</h1>

                <button-group >
                    {this.state.showOpt === true ? <Button onClick={this.DeleteAll} className="btn drop float-right">
                        Delete All Items
                </Button> : ""}<br />
                    <Modal show={this.state.showModalDele} className="col-12 row">
                        <Modal.Header> Are you sure to Delete All Items?</Modal.Header>
                        <Modal.Footer>
                            <Button onClick={this.cancelAll}>No</Button>
                            <Button onClick={this.DelAll}>Yes</Button>{' '}

                        </Modal.Footer>
                    </Modal>
                </button-group>
                <br />
                {this.state.showOpt === true ? (

                    < select
                        className='btn btn-primary dropdown-toggle bootstrap-select'
                        id='dropdown'
                        onClick={this.onChange}
                        defaultValue={this.state.selectedValue}
                    >
                        <option value='id'>Sort by ID</option>
                        <option value='text'>Sort by Task</option>
                    </select>) : ""
                }


                <Dropdown.Menu >

                    {this.state.twd.map((itm, key) => {
                        return (
                            <Dropdown.Item className="dropp" onClick={() => this.onChange(key)}>{itm}

                            </Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
                <br>
                </br>

                <Form onSubmit={this.addItem}>
                    <input
                        type="text"
                        id="in"
                        name="item"
                        value={this.state.inputText.text}
                        onChange={this.handleInput}
                    ></input>
                    <button type="button" class="btn btn-success" variant="success" type="submit">Add Item</button>{' '}
                </Form>
                {
                    this.state.showModaledit === true ? <Form>
                        <input
                            type="text"
                            id="ed"
                            defaultValue={this.state.result}
                            onChange={this.Inp}
                        ></input>
                        <Button color="primary" onClick={this.cancelItem}>Close</Button>
                        <Button color="primary"

                            onClick={() => {
                                this.updateitems();
                            }}>
                            Update Items
                    </Button>
                    </Form> : ""
                }

                <Modal
                    show={this.state.showModal3}
                    className="col-12 row">
                    <Modal.Header>Are you sure to delete this item?</Modal.Header>
                    <Modal.Footer>
                        <Button color="primary" onClick={this.cancelD}>cancel</Button>
                        <Button
                            onClick={() => {
                                this.cDelete();
                            }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Table className="col-12" id="Table1">
                    {this.state.items &&
                        this.state.items.map((itm, key) => {
                            return (
                                <tbody key={key}>
                                    <tr>
                                        <td className={itm.check === true ? "" : "btnDel"}>
                                            {itm.text}
                                            <Button type="button" class="btn btn-danger" variant="danger"
                                                value={itm.delete}
                                                className={
                                                    this.state.showTodo === false ? "noneDel" : "display"
                                                }
                                                onClick={() => this.delete(itm.key)}>
                                                Delete
                                            </Button>
                                        </td>
                                        <td className="Chec">
                                            <Button
                                                className="float-right"
                                                id={key}
                                                className={
                                                    (this.state.showTodo === false ? "none" : "display",
                                                        itm.check === true ? "none" : "display")
                                                }
                                                onClick={() => this.edit(itm.key)}>
                                                Edit
                                            </Button>
                                        </td>
                                        <td
                                            className="Chec"
                                            className={
                                                this.state.showTodo === false ? "display" : "none"
                                            }>
                                            <input
                                                type="checkbox"
                                                className="checkb"
                                                onClick={() => {
                                                    this.checkDelete(itm);
                                                }}
                                            ></input>
                                        </td>
                                    </tr>
                                </tbody >
                            );
                        })
                    }
                </Table >
            </div>
        );
    }
}
export default Wishlist;