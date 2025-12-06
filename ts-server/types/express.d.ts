/// <reference types="express" />

import "express-serve-static-core";

declare module "express-serve-static-core" {
	interface Request {
		userId: string; // or `string` if always present
	}
}
