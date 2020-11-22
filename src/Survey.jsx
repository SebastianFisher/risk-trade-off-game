import React from 'react';
import './Survey.css';

export default class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            age1Val: '',
            genderVal: '',
            decisionVal: '',
            maritalVal: '',
            ageVal: '',
            spouseVal: '',
            employmentVal: '',
            backgroundVal: '',
            incomeVal: '',
            assetsVal: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        let isMarriedQ = null;
        if (this.state.maritalVal === "Married") {
            isMarriedQ = (
                <div>
                    <label>
                        Is your spouse retired?
                        <select name="spouseVal" value={this.state.spouseVal} onChange={this.handleInputChange} className="form-control" required>
                            <option value=''> </option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </label>
                    <br />
                </div>
            )
        }

        let isRetiredQ = null;
        if (this.state.employmentVal === "Retired") {
            isRetiredQ = (
                <div>
                    <label>
                        At what age did you retire?
                    <input type="number" name="ageVal" value={this.state.ageVal} onChange={this.handleInputChange} className="form-control" required />
                    </label>
                    <br />
                </div>
            )
        } else {
            isRetiredQ = (
                <div>
                    <label>
                        At what age are you planning to retire?
                    <input type="number" name="ageVal" value={this.state.ageVal} onChange={this.handleInputChange} className="form-control" required/>
                    </label>
                    <br />
                </div>
            )
        }

        let incomeQ = "About how much is your current gross pre-tax household income?";
        if (this.state.employmentVal === "Retired") {
            incomeQ = "About how much was your pre-tax income just prior to retirement?";
        }

        return (
            <form className="survey">
                <h1 className="title">Please fill out the following information</h1>
                <small>Your information will be kept anonymous</small>
                <br />
                <label>
                    How old are you?
                    <input type="number" name="age1Val" className="form-control" value={this.state.age1Val} onChange={this.handleInputChange} required/>
                </label>
                <br />
                <label>
                    What is your gender?
                    <select name="genderVal" value={this.state.genderVal} className="form-control" onChange={this.handleInputChange} required>
                        <option value=''></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </label>
                <br />
                <label>
                    Are you the primary person in charge of making your household financial decisions?
                    <select name="decisionVal" value={this.state.decisionVal} onChange={this.handleInputChange} className="form-control" required>
                        <option value=''> </option>
                        <option>Yes, I am the primary financial decision-maker</option>
                        <option>No, I make financial decisions equally with another person</option>
                        <option>No, my spouse is the primary financial decision-maker</option>
                        <option>No, someone else is the primary financial decision-maker</option>
                    </select>
                </label>
                <br />
                <label>
                    What is your marital status?
                    <select name="maritalVal" value={this.state.maritalVal} onChange={this.handleInputChange} className="form-control" required>
                        <option value=''> </option>
                        <option>Married</option>
                        <option>Never Married</option>
                        <option>Divorced or separated</option>
                        <option>Widowed</option>
                    </select>
                </label>
                <br />
                {isMarriedQ}
                <label>
                    What is your employment status?
                    <select name="employmentVal" className="form-control" value={this.state.employmentVal} onChange={this.handleInputChange} required>
                        <option value=''> </option>
                        <option>Employed</option>
                        <option>Not Employed</option>
                        <option>Not in the labor force</option>
                        <option>Retired</option>
                    </select>
                </label>
                <br />
                {isRetiredQ}
                <label>
                    Have you ever worked in the financial industry or do you have a formal education in finance?
                    <select name="backgroundVal" className="form-control" value={this.state.backgroundVal} onChange={this.handleInputChange} required>
                        <option value=''> </option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </label>
                <br />
                <label>
                    {`${incomeQ}: $`}
                    <input type="number" name="incomeVal" className="form-control" value={this.state.incomeVal} onChange={this.handleInputChange} required/>
                </label>
                <br />
                <label>
                    About how much is the current value of your household’s financial assets (bank accounts, retirement accounts, stocks, bonds, and mutual funds)?: $
                    <input type="number" name="assetsVal" className="form-control" alue={this.state.assetsVal} onChange={this.handleInputChange} required/>
                </label>
                <br />
                <button type="submit" className="btn btn-danger" disabled={true} required>Submit</button>
            </form>
        )
    }
}