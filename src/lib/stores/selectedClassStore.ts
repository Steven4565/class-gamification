import { writable } from 'svelte/store';

const selectedClassStore = writable<number>(1); // Db PK starts from 1
export default selectedClassStore;
