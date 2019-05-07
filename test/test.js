import { stub } from 'sinon';
import chai, { expect } from 'chai';
import waitFor from '../src/index';

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe ('Wait For general tests', () => {
    it ('Should return the result of a call once it meets the supplied criteria', async () => {
        const expectedValue = 1;
        const mockFunction = stub();
        mockFunction.onCall(0).returns(0);
        mockFunction.onCall(1).returns(0);
        mockFunction.onCall(2).returns(expectedValue);

        const result = await waitFor(
            mockFunction,
            x => x === expectedValue,
            30000
        );

        expect(result).to.equal(expectedValue);
        expect(mockFunction).to.have.been.calledThrice;
    });

    it ('Should reject with an error if the condition is not met within the timeout', async () => {
        const mockFunction = stub().returns(0);
        
        let error;
        try {
            await waitFor(
                mockFunction,
                x => x === 1,
                2000
            );
        } catch (err) {
            error = err;
        }

        expect(error).to.be.ok;
    });
});
