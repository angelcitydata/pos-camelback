import React from "react";
import Blob, { DEFAULT_BLOB_INDEX } from "./components/Blob";

function PreOrder() {
	return (
		<div className="min-h-screen p-4 bg-slate-100 md:p-6 text-slate-700">
			<div className="grid h-[calc(100vh-2rem)] place-items-center md:h-[calc(100vh-3rem)]">
				<section className="w-full max-w-3xl p-8 bg-white border shadow-sm rounded-3xl border-slate-200 md:p-12">
					<div className="flex flex-col items-center gap-6 text-center md:gap-7">
						<div className="relative grid place-items-center h-72 w-72 md:h-80 md:w-80">
							<Blob
								index={DEFAULT_BLOB_INDEX}
								className="absolute inset-0 w-full h-full opacity-60"
								color="rgba(187, 247, 208, 0.65)"
							/>
							<div className="relative z-10 grid w-32 h-32 rounded-full bg-white/95 ring-1 ring-slate-200 place-items-center">
								<i
									className="text-6xl text-green-600 fa-duotone fa-basket-shopping"
									aria-hidden
								/>
							</div>
						</div>

						<div className="space-y-2">
							<h1 className="text-2xl font-semibold tracking-wide uppercase text-slate-900 md:text-3xl">
								Ready for a New Order
							</h1>
							<p className="max-w-xl mx-auto text-base leading-relaxed text-slate-600 md:text-lg">
								Press the <span className="font-semibold text-slate-900">New Order</span>{" "}
								button to begin adding products to the cart.
							</p>
						</div>

						<div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide text-green-700 uppercase border border-green-200 rounded-full bg-green-50">
							<i className="fa-solid fa-arrow-up-right" aria-hidden />
							Tap New Order to start
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default PreOrder;
