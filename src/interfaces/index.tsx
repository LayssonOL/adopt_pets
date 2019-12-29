export type AdopetsResponse = {
	data: {
		status: number;
		code: number;
		data: {
			access_key: string;
		};
	};
};

export type Pet = {
	id: number;
	name: string;
	uuid: string;
	custom_code: string;
	specie_id: number;
	breed_primary_id: number;
	price: string;
	created_date: string;
	status_key: string;
	branch_id: number;
	payment_model_key: string;
	sex_key: string;
	size_key: string;
	age_key: string;
	specie: {
		id: number;
		name: string;
	};
	branch: {
		id: number;
		uuid: string;
	};
	breed_primary: {
		id: number;
		name: string;
	};
};

export type IconText = {
	type: string;
	text: string;
};

export type PetSearch = {
	search: {
		sex_key?: string;
		size_key?: string;
		age_key?: string;
		_fields: string[];
		specie: {
			with: {
				_fields: string[];
			};
		};
		breed_primary: {
			with: {
				_fields: string[];
			};
		};
		branch: {
			with: {
				uuid: string;
				_fields: string[];
			};
		};
	};
	options: {
		page: number;
		limit: number;
		sort: string[];
	};
};

export const PetsSearchInitial: PetSearch = {
	search: {
		sex_key: 'FEMALE',
		_fields: [
			'id',
			'uuid',
			'custom_code',
			'name',
			'specie_id',
			'breed_primary_id',
			'price',
			'created_date',
			'status_key',
			'branch_id',
			'payment_model_key',
			'sex_key',
			'size_key',
			'age_key'
		],
		specie: {
			with: {
				_fields: ['id', 'name']
			}
		},
		breed_primary: {
			with: {
				_fields: ['id', 'name']
			}
		},
		branch: {
			with: {
				uuid: 'ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff',
				_fields: ['id', 'uuid']
			}
		}
	},
	options: {
		page: 1,
		limit: 10,
		sort: []
	}
};
