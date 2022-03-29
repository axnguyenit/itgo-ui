import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';
import { useNavigate, useParams } from 'react-router-dom';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { Box, Button, Card, Container, IconButton } from '@mui/material';
import React, { useState, useEffect, useRef, useCallback } from 'react';
// component
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// api
import applicationApi from '../../api/applicationApi';
// utils
import cloudinary from '../../utils/cloudinary';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PDFViewer() {
	const [pdf, setPDF] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [scale, setScale] = useState(2);
	const [numPages, setNumPages] = useState(0);
	const canvasEl = useRef();
	const navigate = useNavigate();
	const { id } = useParams(); // application ID

	const renderPage = useCallback(async ({ pdfDoc, pageNum, scale }) => {
		const page = await pdfDoc.getPage(pageNum);
		const ctx = canvasEl.current.getContext('2d');
		const viewport = page.getViewport({ scale });
		canvasEl.current.width = viewport.width;
		canvasEl.current.height = viewport.height;

		page.render({
			canvasContext: ctx,
			viewport: viewport,
		});
	}, []);

	const prevPage = () => {
		if (currentPage > 1) {
			renderPage({ pdfDoc: pdf, pageNum: currentPage - 1, scale });
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage < numPages) {
			renderPage({ pdfDoc: pdf, pageNum: currentPage + 1, scale });
			setCurrentPage(currentPage + 1);
		}
	};

	const zoomOut = () => {
		renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale - 0.1 });
		setScale(scale - 0.1);
	};

	const zoomIn = () => {
		renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale + 0.1 });
		setScale(scale + 0.1);
	};

	useEffect(() => {}, []);

	useEffect(() => {
		const fetchPdf = async () => {
			try {
				const response = await applicationApi.get(id);
				const loadingTask = pdfjs.getDocument(cloudinary.pdf(response.data.application.cv));
				const pdfDoc = await loadingTask.promise;
				setPDF(pdfDoc);
				setNumPages(pdfDoc._pdfInfo.numPages);
				renderPage({ pdfDoc, pageNum: 1, scale });
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		fetchPdf();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [renderPage, scale, id]);

	return (
		<Page title="Students">
			<Container>
				<HeaderBreadcrumbs
					heading="Applications"
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{ name: 'Applications', href: PATH_DASHBOARD.applications.root },
						{ name: 'CV' },
					]}
				/>
				<Card>
					<Box
						sx={{
							bgcolor: 'primary.main',
							height: 50,
							px: 3,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton onClick={prevPage}>
								<Iconify icon="fluent:previous-24-filled" width={20} height={20} />
							</IconButton>
							<Box>
								{currentPage} / {numPages}
							</Box>
							<IconButton onClick={nextPage}>
								<Iconify icon="fluent:next-24-filled" width={20} height={20} />
							</IconButton>
							<IconButton onClick={zoomOut}>
								<Iconify icon="charm:zoom-out" width={20} height={20} />
							</IconButton>
							<IconButton onClick={zoomIn}>
								<Iconify icon="charm:zoom-in" width={20} height={20} />
							</IconButton>
						</Box>

						<Button variant="contained">Approve</Button>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Box>
							<canvas ref={canvasEl} />
						</Box>
					</Box>
				</Card>
			</Container>
		</Page>
	);
}
