import {Request, Response} from "express"
import {handleToggle} from "./toggle";
import {handleDocs} from "./docs";
import {handleAnnouncements} from "./announcements";

export const methods: { [key: string]: (req: Request, res: Response, endpoint: string) => void } = {
	"docs": handleDocs,
	"toggle": handleToggle,
	"announcements": handleAnnouncements,
}
