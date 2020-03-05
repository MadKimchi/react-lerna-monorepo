import { RxFormGroupRef } from "./form-group.class";
import { Subject } from 'rxjs';
import { ControlTypeEnum } from "../enums";
import { IRxFormControlRef } from "../interfaces";

export class RxBaseControlRef implements IRxFormControlRef {
    public hasError: boolean = false;
    public isDirty: boolean = false;
    public isTouched: boolean = false;
    
    public placeholder: string = ''
    public label: string = '';
    public value: any;
    public validators: Function[] = [];
    public formGroupRef!: RxFormGroupRef; // prettier-ignore

    public unsubscribe: Subject<void> = new Subject<void>();

    private _errors: Map<string, string> = new Map();

    constructor(public key: string, public type: ControlTypeEnum) {
        this.setError = this.setError.bind(this);
    }

    public get valid(): boolean {
        return !this.invalid;
    }

    public get errors(): string[] {
        if (this.hasError) {
        return Array.from(this._errors.values());
        }
        return [];
    }

    public get invalid(): boolean {
        if (!this.validators.length) {
        return this.hasError;
        }

        this.hasError = this.validators.reduce(this.setError, true);
        return this.hasError;
    }

    public clear(): void {
        this.hasError = false;
        this.isDirty = false;
        this.isTouched = false;
        // this.value = '';
    }

    private setError(hasError: boolean, validator: Function): boolean {
        const error = validator(this.value);
        if (!!error) {
        this._errors.set(error.key, error.msg);
        }
        return hasError && !!error;
    }
}