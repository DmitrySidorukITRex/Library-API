import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ITableFilter, ITableFilterSettings } from '../../interfaces/table-filter.interface';

@UntilDestroy()
@Component({
    selector: 'lib-table-filter',
    templateUrl: './table-filter.component.html',
    styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit, OnChanges {
    @Input() filterFields: ITableFilter[] = [];
    @Input() filterValues: Set<string> = new Set();
    @Output() selectFilterField = new EventEmitter<string>();
    @Output() applyFilter = new EventEmitter<ITableFilterSettings[]>();
    @Output() resetFilter = new EventEmitter();

    public arrayWithControls: any[];
    public filterCount = 1;
    public maxFilterCount: number;
    public selectedControlIndex: number;

    constructor() { }

    ngOnInit(): void {
        this.maxFilterCount = this.filterFields.length;
        this.initFirstControls();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.filterValues && changes.filterValues.currentValue && this.selectedControlIndex !== undefined) {
          this.arrayWithControls[this.selectedControlIndex].filterValues = changes.filterValues.currentValue;
        }
    }

    get isApplyFilterDisabled(): boolean {
        return this.arrayWithControls.some(x => !x.filterValueControl.value?.length);
    }

    public onAddFilter(): void {
        this.filterCount++;
        let filterFields = this.filterFields;
        this.arrayWithControls.forEach(control => {
            filterFields = filterFields.filter(x => x.value !== control.filterFieldControl.value);
        });

        this.arrayWithControls.push(
            {
                filterFieldControl: new FormControl(null, Validators.required),
                filterValueControl: new FormControl(null, Validators.required),
                filterFields: filterFields,
                filterValues: null
            }
        );
        
    }

    public onRemoveFilter(index: number): void {
        this.arrayWithControls.splice(index, 1);
        this.filterCount--;
    }

    public onSelectFilterField(value: string, index: number): void {
        this.selectedControlIndex = index;
        this.selectFilterField.emit(value);
    }

    public onApplyFilter(): void {
        const filterSettings: ITableFilterSettings[] = this.arrayWithControls.map(x => ({field: x.filterFieldControl.value, value: x.filterValueControl.value}));
        this.applyFilter.emit(filterSettings);
    }

    public onResetFilter(): void {
        this.initFirstControls();
        this.resetFilter.emit();
    }

    private initFirstControls(): void {
        this.arrayWithControls = [
            {
                filterFieldControl: new FormControl(null, Validators.required),
                filterValueControl: new FormControl(null, Validators.required),
                filterFields: this.filterFields,
                filterValues: null
            }
        ];
    }

}
