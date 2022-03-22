import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
//
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { PATH_PAGE } from '../../routes/paths';
// @mui
import { Card, Container, DialogTitle } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import { CalendarEvent, CalendarStyle, CalendarToolbar } from '../../sections/home/calendar';
// api
import eventApi from '../../api/eventApi';

// ----------------------------------------------------------------------

export default function Calendar() {
	const isDesktop = useResponsive('up', 'sm');
	const calendarRef = useRef(null);
	const [date, setDate] = useState(new Date());
	const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	const getEvents = async () => {
		try {
			const response = await eventApi.getByStudent(id);
			setEvents(response.data.events);
		} catch (error) {
			console.error(error);
			navigate(PATH_PAGE.page500);
		}
	};

	useEffect(() => {
		getEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
			calendarApi.changeView(newView);
			setView(newView);
		}
	}, [isDesktop]);

	const handleClickToday = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.today();
			setDate(calendarApi.getDate());
		}
	};

	const handleChangeView = (newView) => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.changeView(newView);
			setView(newView);
		}
	};

	const handleClickDatePrev = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.prev();
			setDate(calendarApi.getDate());
		}
	};

	const handleClickDateNext = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.next();
			setDate(calendarApi.getDate());
		}
	};

	// user not need
	// const handleSelectRange = (arg) => {
	// 	const calendarEl = calendarRef.current;
	// 	if (calendarEl) {
	// 		const calendarApi = calendarEl.getApi();
	// 		calendarApi.unselect();
	// 	}
	// 	dispatch(selectRange(arg.start, arg.end));
	// 	setIsOpenModal(true);
	// };

	const handleSelectEvent = (arg) => {
		const selectedEvent = events.find((event) => event.id === arg.event.id);
		setSelectedEvent(selectedEvent);
		setIsOpenModal(true);
	};

	const handleCloseModal = () => {
		setIsOpenModal(false);
		setSelectedEvent(null);
	};

	return (
		<Page title="Calendar">
			<Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
				<Card>
					<CalendarStyle>
						<CalendarToolbar
							date={date}
							view={view}
							onNextDate={handleClickDateNext}
							onPrevDate={handleClickDatePrev}
							onToday={handleClickToday}
							onChangeView={handleChangeView}
						/>
						<FullCalendar
							weekends
							droppable
							// selectable //user not need
							events={events}
							ref={calendarRef}
							rerenderDelay={10}
							initialDate={date}
							initialView={view}
							dayMaxEventRows={3}
							eventDisplay="block"
							headerToolbar={false}
							allDayMaintainDuration
							eventResizableFromStart
							eventClick={handleSelectEvent}
							height={isDesktop ? 720 : 'auto'}
							plugins={[
								listPlugin,
								dayGridPlugin,
								timelinePlugin,
								timeGridPlugin,
								interactionPlugin,
							]}
						/>
					</CalendarStyle>
				</Card>

				<DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
					<DialogTitle>Event</DialogTitle>

					<CalendarEvent event={selectedEvent || {}} onCancel={handleCloseModal} />
				</DialogAnimate>
			</Container>
		</Page>
	);
}
